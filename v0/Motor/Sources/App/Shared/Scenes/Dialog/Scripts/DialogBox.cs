using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Constants;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.Dialog;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;


/// <summary>
/// Dialog box : display content text and a texture animated sprite
/// </summary>
public class DialogBox : Node2D
{
	#region Constants
	private const string BASE_RESOURCE_PATH = "res://Sources/App/Shared/Assets/Animations";
	private const string BOXSIZEANIMATION_LEFT_KEY = "BoxSizeLeftAnimation";
	private const int MARGIN_X = 20;
	private const int MARGIN_Y = 20;
	#endregion

	#region Fields
	private EventsProxy _eventsProxy = null;
	private float _containerHeight = 100;
	private List<MessageContent> _messageContents;
	private RichTextLabel _content = null;
	private Timer _currentTimer = null;
	private Button _nextOrCloseButton = null;
	private AnimatedSprite _animatedSprite = null;
	private ColorRect _borderRectangle = null;
	private int _currentPartOfMessage = 0;
	private Node2D _container = null;
	private AnimationPlayer _animateBox = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		this._eventsProxy = this.GetRootNode<EventsProxy>();

		this._container = this.GetNode<CanvasLayer>("CanvasLayer").GetNode<Node2D>("Container");
		this.SetVisibility(false);

		this._content = this._container.GetNode<RichTextLabel>("Content");
		this._currentTimer = this._container.GetNode<Timer>("Timer");
		this._nextOrCloseButton = this._container.GetNode<Button>("NextOrClose");
		this._animatedSprite = this._container.GetNode<AnimatedSprite>("AnimatedSprite");
		this._borderRectangle = this._container.GetNode<ColorRect>("BorderRect");
		this._animateBox = this._container.GetNode<AnimationPlayer>("AnimateBox");

		this.GetTree().Root.Connect("size_changed", this, nameof(Resize));
	}

	public override void _Input(InputEvent @event)
	{
		base._Input(@event);
		if (@event.IsActionPressed(KeyPressActionKeys.PressEnter))
		{
			this.DisplayFullMessageOrGoToNextOne();
		}
	}

	/// <summary>
	/// Begins the display of the message list
	/// </summary>
	public void Start(List<MessageContent> messageContents)
	{
		this._messageContents = messageContents;

		this.DefineWindowPosition(this.CurrentMessage.SpriteDirection);

		this._animateBox.Play(BOXSIZEANIMATION_LEFT_KEY);
	}

	private void StartDisplayOneMessage()
	{
		this.Initialize();
		this._currentTimer.Start();
	}

	/// <summary>
	/// Stops displaying text
	/// </summary>
	public void Stop()
	{
		this._currentTimer.Stop();
		this.Reset();
	}

	/// <summary>
	/// One tick to display new character
	/// </summary>
	public void OnTimerTimeout()
	{
		this.CurrentVisibleCharacters++;
		if (this.CurrentMessage != null && this.CurrentPartOfMessage >= this.CurrentMessage.Content.Length)
		{
			this._eventsProxy.DialogBoxEvents.BeEndOfOneMessage();
			this._currentTimer.Stop();
		}
	}

	public void DisplayFullMessageOrGoToNextOne()
	{
		Action nextAtion = this.DisplayFullMessage;

		if (this.CurrentVisibleCharacters >= this.CurrentMessage?.Content.Length - 1)
		{
			nextAtion = this.OnNextOrClosePressed;
		}

		nextAtion.Invoke();
	}
	#endregion

	#region Internal methods
	private void _on_AnimateBox_animation_finished(String animationName)
	{
		if (animationName == BOXSIZEANIMATION_LEFT_KEY)
		{
			this.StartDisplayOneMessage();
		}
	}

	private void SetVisibility(bool visible)
	{
		this.Visible = visible;
		this._container.Visible = visible;
	}

	private void Initialize()
	{
		this.SetVisibility(this.MessageContents != null & this.MessageContents.Count > 0);

		this.CurrentVisibleCharacters = 0;
		this._content.BbcodeText = this.DefineAlignement(this.CurrentMessage.Content);

		this._animatedSprite.Frames = null;
		if (this.CurrentMessage.SpriteFrames != null)
		{
			this._animatedSprite.Frames = this.CurrentMessage.SpriteFrames;
			this._animatedSprite.Play(DialogBoxSpriteStatus.Idle.ToString().ToLower());
		}
	}

	private void DefineWindowPosition(Direction position)
	{
		Rect2 windowPosition = this.GetViewportRect();
		float x = 0;
		float y = windowPosition.Size.y - this._borderRectangle.RectSize.y;

		if (position == Direction.Left)
		{
			x = MARGIN_X;
		}

		if (position == Direction.Right)
		{
			x = windowPosition.End.x - this._borderRectangle.RectSize.x - MARGIN_X;
		}

		Vector2 newPosition = new Vector2(x, y - MARGIN_Y);
		this.Position = newPosition;

		var animation = this._animateBox.GetAnimation(BOXSIZEANIMATION_LEFT_KEY);
		int id = animation.FindTrack("Background:position");
		if (id >= 0)
		{
			int key = animation.TrackFindKey(id, 0.1f, true);
			if(key >= 0)
			{
				animation.TrackSetKeyValue(id, key, new Vector2(newPosition.x - 50, newPosition.y));
			}

			key = animation.TrackFindKey(id, 0.5f, true);
			if (key >= 0)
			{
				animation.TrackSetKeyValue(id, key, newPosition);
			}
		}
	}

	/// <summary>
	/// Manage the next display message : if there isnt new message close the display box
	/// </summary>
	private void OnNextOrClosePressed()
	{
		this.CurrentPartOfMessage++;

		this.Visible = this.CurrentPartOfMessage < this.MessageContents.Count;
		this._container.Visible = this.Visible;

		if (this.Visible)
		{
			this.DefineWindowPosition(this.CurrentMessage.SpriteDirection);
			this._animateBox.Play(BOXSIZEANIMATION_LEFT_KEY);
		}

		if (!this.Visible)
		{
			this.MessageContents.Clear();
			this._eventsProxy.DialogBoxEvents.BeEndOfAllMessages();
		}

	}

	private void DisplayFullMessage()
	{
		this.CurrentVisibleCharacters = (this.CurrentMessage?.Content.Length).GetValueOrDefault(0);
		this._currentTimer.Stop();
	}

	private void Resize()
	{
		this.DefineWindowPosition(this.CurrentMessage.SpriteDirection);
	}

	private void Reset()
	{
		this.CurrentVisibleCharacters = 0;
		this.CurrentPartOfMessage = 0;
	}

	private string DefineAlignement(string content)
	{
		return content;
	}
	#endregion

	#region Properties
	/// <summary>
	/// Defines the number of characters to show in the label content
	/// </summary>
	public int CurrentVisibleCharacters
	{
		get => this._content.VisibleCharacters;
		set
		{
			this._content.VisibleCharacters = value;
		}
	}

	/// <summary>
	/// Content message to display
	/// </summary>
	public MessageContent CurrentMessage
	{
		get
		{
			MessageContent content = null;

			if (this.CurrentPartOfMessage < this.MessageContents?.Count)
			{
				content = this.MessageContents[this.CurrentPartOfMessage];
			}

			return content;
		}
	}

	/// <summary>
	/// Gets the current displayed direction of the animated sprite
	/// </summary>
	public Direction DisplayedDirection
	{
		get
		{
			return this.CurrentMessage != null ? this.CurrentMessage.SpriteDirection : Direction.Left;
		}
	}

	/// <summary>
	/// Index of the part of the message in the message list
	/// </summary>
	public int CurrentPartOfMessage { get => this._currentPartOfMessage; private set => this._currentPartOfMessage = value; }

	/// <summary>
	/// List of message text as one full message to be displayed in X steps
	/// </summary>
	public List<MessageContent> MessageContents { get => this._messageContents; private set => this._messageContents = value; }

	/// <summary>
	/// Sprite frames to display animated sprite
	/// </summary>
	public SpriteFrames AnimatedSpriteFrames
	{
		get => this._animatedSprite.Frames;
		set => this._animatedSprite.Frames = value;
	}
	#endregion
}
