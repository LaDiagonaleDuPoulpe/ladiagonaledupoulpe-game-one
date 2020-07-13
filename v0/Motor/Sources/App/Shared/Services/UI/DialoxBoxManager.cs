using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.DialogBox;
using ladiagonaledupoulpe.Sources.App.Core.Models.DialogBox;
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
        private List<DialogBoxExchange> _exchanges;
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
        }

        /// <summary>
        /// Preloads data about the dialog box
        /// </summary>
        public void Preload(List<DialogBoxExchange> contents)
        {
            this._exchanges = contents;
        }
        #endregion

        #region Internal methods
        /// <summary>
        /// Starts a dialog box exchange
        /// </summary>
        /// <param name="key">Key of exchange</param>
        public void Start(string key)
        {
            this.DialogBox.Start(this._exchanges.First(item => item.Key == key).Messages);
        }

        public void ShowDialog()
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
