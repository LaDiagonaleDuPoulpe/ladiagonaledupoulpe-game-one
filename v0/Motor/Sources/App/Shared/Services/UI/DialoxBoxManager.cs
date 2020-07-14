using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.DialogBox;
using ladiagonaledupoulpe.Sources.App.Core.Models.DialogBox;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Resources;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Services
{
    /// <summary>
    /// Manager of the dialogbox of one scene.
    /// Allows you to command dialog box of the scene : some messages will be auto launched, some others will be load by signal or key.
    /// </summary>
    public class DialoxBoxManager : Node, IDialoxBoxManager
    {
        #region Fields
        #region Signals
        /// <summary>
        /// Occurs when all messages of one exchange in dialogbox are done
        /// </summary>
        [Signal]
        public delegate void EndOfOneExchange();
        #endregion

        private Timer _timer = null;
        private List<DialogBoxExchange> _exchanges = null;
        private DialogBoxExchange _currentExchange = null;
        private DialogBox _dialogBox = null;
        #endregion

        #region Constructors
        private DialoxBoxManager() { }
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();

            this.DialogBox = this.GetNode<DialogBox>("/root/DialogBox");
            this.DialogBox.Connect(DialogBoxActionType.EndOfAllMessages.ToString(), this, nameof(StopDisplayMessagesOfOneExchange));

            this.CreateTimer();
        }

        /// <summary>
        /// Preloads data about the dialog box
        /// </summary>
        public void Preload(List<DialogBoxExchange> contents)
        {
            this._exchanges = contents;
        }

        /// <summary>
        /// Starts a dialog box exchange
        /// </summary>
        /// <param name="key">Key of exchange</param>
        public void Start(string key)
        {
            this._currentExchange = this._exchanges.First(item => item.Key == key);
            this._timer.Start(this._currentExchange.TimeBeforeStart / 1000);
        }
        #endregion

        #region Internal methods
        private void CreateTimer()
        {
            this._timer = new Timer();
            this._timer.Autostart = false;
            this.AddChild(this._timer);

            this._timer.Connect("timeout", this, nameof(ActiveMethodAfterTimeOut));
        }

        private void ActiveMethodAfterTimeOut()
        {
            GD.Print("ActiveMethodAfterTimeOut");

            this._timer.Stop();
            if (this._currentExchange != null)
            {
                this.DialogBox.Start(this._currentExchange.Messages);
                this._currentExchange = null;
            }
        }

        private void StopDisplayMessagesOfOneExchange()
        {
            this.EmitSignal(DialogBoxActionType.EndOfOneExchange.ToString());
        }

        private void ShowDialog()
        {
            GD.Print("ShowDialog event, 13:07/2020, seems to not run ... for now, don't now why ...");
        }
        #endregion

        #region Properties
        /// <summary>
        /// Dialog box scene to display exchange items
        /// </summary>
        public DialogBox DialogBox { get => this._dialogBox; private set => this._dialogBox = value; }
        #endregion
    }
}
