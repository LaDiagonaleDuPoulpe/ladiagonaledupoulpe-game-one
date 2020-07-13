using Godot;
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
    public class DialoxBoxManager : Node
    {
        #region Fields
        private List<DialogBoxExchange> _exchanges;
        #endregion

        #region Constructors
        private DialoxBoxManager() {}
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();
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
        public void ShowDialog()
        {
            GD.Print("ShowDialog");
        }
        #endregion

        #region Properties
        #endregion
    }
}
