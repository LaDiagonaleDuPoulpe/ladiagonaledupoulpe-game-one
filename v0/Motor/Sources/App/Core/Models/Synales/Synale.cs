using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Games;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Synales
{
    /// <summary>
    /// Synale power
    /// </summary>
    public class Synale : Node
    {
        #region Fields
        private RulesSet _rules = null;
        #endregion

        #region Constructors
        public Synale() {}

        public Synale(PowerPoint point)
        {
            this.CurrentPower = point;
        }
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();
            this._rules = this.GetNode<Game>("/root/CurrentGame").RulesSet;
        }

        /// <summary>
        /// Initializes the power of the synale
        /// </summary>
        public void Initialize(PowerPoint point)
        {
            this.CurrentPower = point;
        }

        /// <summary>
        /// Updates the power value, and give the validity of the action
        /// </summary>
        /// <returns></returns>
        public bool ActToReborn()
        {
            this.CurrentPower.Add(-this._rules.RebornCost);
            return this.CurrentPower.IsValid;
        }
        #endregion

        #region Properties
        /// <summary>
        /// Current power of the synale 
        /// </summary>
        public PowerPoint CurrentPower { get; private set; }
        #endregion
    }
}
