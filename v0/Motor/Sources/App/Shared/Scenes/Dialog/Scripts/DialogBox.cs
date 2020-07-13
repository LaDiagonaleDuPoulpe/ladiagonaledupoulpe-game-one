using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.Dialog;
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
    private const float DEFAULT_HEIGHT = 200;
    #endregion

    #region Fields
    private List<MessageContent> _messageContents;
    private RichTextLabel _content = null;
    private Timer _currentTimer = null;
    private Button _nextOrCloseButton = null;
    private AnimatedSprite _animatedSprite = null;
    private ColorRect _borderRectangle = null;
    private int _currentPartOfMessage = 0;

    #region Signals
    /// <summary>
    /// Occurs when one message is ended
    /// </summary>
    [Signal]
    public delegate void EndOfOneMessage();

    /// <summary>
    /// Occurs when all of the message are ended
    /// </summary>
    [Signal]
    public delegate void EndOfAllMessages();

    /// <summary>
    /// Signal to display one exchange in the displaybox
    /// </summary>
    /// <param name="key">Key of one exchange</param>
    [Signal]
    public delegate void DisplayExchange(string key);
    #endregion
    #endregion

    #region Public methods
    public override void _Ready()
    {
        this.Visible = false;

        this._content = this.GetNode("Content") as RichTextLabel;
        this._currentTimer  = this.GetNode("Timer") as Timer;
        this._nextOrCloseButton = this.GetNode("NextOrClose") as Button;
        this._animatedSprite = this.GetNode("AnimatedSprite") as AnimatedSprite;
        this._borderRectangle = this.GetNode("BorderRect") as ColorRect;

        this.GetTree().Root.Connect("size_changed", this, nameof(Resize));
        this.PutAtTheBottom();
    }

    /// <summary>
    /// Begins the display of the message list
    /// </summary>
    public void Start(List<MessageContent> messageContents)
    {
        this._messageContents = messageContents;

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
            this.EmitSignal(nameof(EndOfOneMessage));
            this._currentTimer.Stop();
        }
    }

    /// <summary>
    /// Manage the next display message : if there isnt new essage close the display box
    /// </summary>
    public void OnNextOrClosePressed()
    {        
        this.CurrentPartOfMessage++;

        this.Visible = this.CurrentPartOfMessage < this.MessageContents.Count;
        if (this.Visible)
        {
            this.Initialize();
            this._currentTimer.Start();
        }

        if (! this.Visible)
        {
            this.MessageContents.Clear();
            this.EmitSignal(nameof(EndOfAllMessages));
        }
    }
    #endregion

    #region Internal methods
    private void Initialize()
    {
        this.CurrentVisibleCharacters = 0;
        this._content.BbcodeText = this.DefineAlignement(this.CurrentMessage.Content);

        this._animatedSprite.Frames = null; 
        if (this.CurrentMessage.SpriteFrames != null)
        {
            this._animatedSprite.Frames = this.CurrentMessage.SpriteFrames;
            this._animatedSprite.Play(DialogBoxSpriteStatus.Idle.ToString().ToLower());

            this.DefineAnimatedSpritePosition();
        }

        this.SetTextFromNextOrCloseButton();
    }

    private void DefineAnimatedSpritePosition()
    {
        if (this.CurrentMessage.SpriteDirection == AnimatedSpriteDirection.Right)
        {
            Vector2 animatedSpriteSize = new Vector2(130, 70); // TODO: 08/06/2020, see to get real size
            Sprite background = this.GetNode("Background") as Sprite;

            Vector2 newPosition = new Vector2(this._animatedSprite.Position.x + this._borderRectangle.RectSize.x - animatedSpriteSize.x,
                                              this._animatedSprite.Position.y + this._borderRectangle.RectSize.y - animatedSpriteSize.y);

            this._animatedSprite.Position = newPosition;
        }
    }

    private void PutAtTheBottom()
    {
        Rect2 windowPosition = this.GetViewportRect();

        float newY = windowPosition.Size.y - this._borderRectangle.RectSize.y;
        float newX = windowPosition.Size.x / 2 - (this._borderRectangle.RectSize.x / 2);

        this.Position = new Vector2(newX, newY);
    }

    private void Resize()
    {
        this.PutAtTheBottom();
    }

    private void Reset()
    {
        this.CurrentVisibleCharacters = 0;
        this.CurrentPartOfMessage = 0;
    }

    private void SetTextFromNextOrCloseButton()
    {
        this._nextOrCloseButton.Text = "Fermer";
        if (this.CurrentPartOfMessage < this.MessageContents.Count - 1)
        {
            this._nextOrCloseButton.Text = "Suivant";
        }
    }

    private string DefineAlignement(string content)
    {
        if (this.CurrentMessage.SpriteDirection == AnimatedSpriteDirection.Right)
        {
            content = content.AlignRightToBBContent();
        }

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

            if (this.CurrentPartOfMessage < this.MessageContents.Count)
            {
                content = this.MessageContents[this.CurrentPartOfMessage];
            }

            return content;
        }
    }

    /// <summary>
    /// Gets the current displayed direction of the animated sprite
    /// </summary>
    public AnimatedSpriteDirection DisplayedDirection
    {
        get 
        {
            return this.CurrentMessage != null ? this.CurrentMessage.SpriteDirection : AnimatedSpriteDirection.Left;
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
