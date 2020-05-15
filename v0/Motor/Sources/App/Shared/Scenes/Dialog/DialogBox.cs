using Godot;
using System;
using System.Collections.Generic;

/// <summary>
/// Dialog box : display content text and a texture animated sprite
/// </summary>
public class DialogBox : Node2D
{
    #region Fields
    private List<string> _messageList = new List<string>()
    {
        "Hello, ca va ?",
        "Yes et toi ?"
    };
    private RichTextLabel _label = null;
    private Timer _currentTimer = null;
    private Button _nextOrCloseButton = null;
    private int _currentPartOfMessage = 0;
    #endregion

    #region Public methods
    public override void _Ready()
    {
        this._label = this.GetNode("Content") as RichTextLabel;
        this._currentTimer  = this.GetNode("Timer") as Timer;
        this._nextOrCloseButton = this.GetNode("NextOrClose") as Button;
        this.Initialize();
    }

    public void OnTimerTimeout()
    {
        this.CurrentVisibleCharacters++;
        if (this.CurrentPartOfMessage >= this.Message.Length)
        {
            this._currentTimer.Stop();
        }
    }

    public void OnNextOrClosePressed()
    {        
        this.CurrentPartOfMessage++;

        this.Visible = this.CurrentPartOfMessage < this.MessageList.Count;
        if (this.Visible)
        {
            this.Initialize();
            this._currentTimer.Start();
        }
    }
    #endregion

    #region Internal methods
    private void Initialize()
    {
        this.CurrentVisibleCharacters = 0;
        this._label.BbcodeText = this.Message;

        this.SetTextFromNextOrCloseButton();
    }

    private void SetTextFromNextOrCloseButton()
    {
        this._nextOrCloseButton.Text = "Fermer";
        if (this.CurrentPartOfMessage < this.MessageList.Count - 1)
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
    public string Message
    {
        get
        {
            string content = string.Empty;

            if (this.CurrentPartOfMessage < this.MessageList.Count)
            {
                content = this.MessageList[this.CurrentPartOfMessage];
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
    public List<string> MessageList { get => this._messageList; set => this._messageList = value; }
    #endregion
}
