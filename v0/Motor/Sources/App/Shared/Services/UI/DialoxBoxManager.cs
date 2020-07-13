using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.Dialog.Scripts;
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
    public class DialoxBoxManager : Node
    {
        #region Fields
        #region Signals
        [Signal]
        public delegate void ShowBox();
        #endregion

        private List<DialogBoxExchange> _exchanges;
        #endregion

        #region Constructors
        private DialoxBoxManager() {}
        #endregion

        #region Public methods
        /// <summary>
        /// Preloads data about the dialog box
        /// </summary>
        public void Preload(List<DialogBoxExchange> contents)
        {
            this._exchanges = contents;

            // this.dialog = this.GetNode<DialogBox>(); TODO: 09/07/2020, Get dialog box node

            this.Connect("ShowBox", this, nameof(ShowDialog));
        }
        #endregion

        #region Internal methods
        private void ShowDialog()
        {
            GD.Print("ShowDialog");
        }
        #endregion

        #region Properties
        #endregion
    }
}
