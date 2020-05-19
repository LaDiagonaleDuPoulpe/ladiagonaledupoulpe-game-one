using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.Dialog;
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
    #endregion

    #region Fields
    private List<MessageContent> _messageContents;
    private RichTextLabel _label = null;
    private Timer _currentTimer = null;
    private Button _nextOrCloseButton = null;
    private AnimatedSprite _animatedSprite = null;
    private int _currentPartOfMessage = 0;

    #region Events
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
    #endregion
    #endregion

    #region Public methods
    public override void _Ready()
    {
        this._label = this.GetNode("Content") as RichTextLabel;
        this._currentTimer  = this.GetNode("Timer") as Timer;
        this._nextOrCloseButton = this.GetNode("NextOrClose") as Button;
        this._animatedSprite = this.GetNode("AnimatedSprite") as AnimatedSprite;
    }

    /// <summary>
    /// Begins the display of the message list
    /// </summary>
    public void Start(List<MessageContent> messageContents)
    {
        this._messageContents = messageContents;

        this.Initialize();
        this._currentTimer.Start();
        this._animatedSprite.Play(DialogBoxSpriteStatus.Idle.ToString().ToLower());
    }

    /// <summary>
    /// Stops displaying text
    /// </summary>
    public void Stop()
    {
        this._currentTimer.Stop();
        this.Reset();
    }

    public void OnTimerTimeout()
    {
        this.CurrentVisibleCharacters++;
        if (this.CurrentPartOfMessage >= this.Message.Content.Length)
        {
            this.EmitSignal(nameof(EndOfOneMessage));
            this._currentTimer.Stop();
        }
    }

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
        this._label.BbcodeText = this.Message.Content;

        this.SetTextFromNextOrCloseButton();
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
    #endregion

    #region Properties
    /// <summary>
    /// Defines the number of characters to show in the label content
    /// </summary>
    public int CurrentVisibleCharacters 
    { 
        get => this._label.VisibleCharacters; 
        set 
        {
            this._label.VisibleCharacters = value; 
        }
    }

    /// <summary>
    /// Content message to display
    /// </summary>
    public MessageContent Message
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
