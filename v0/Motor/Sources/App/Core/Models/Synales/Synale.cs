using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Games;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Synales
{
    /// <summary>
    /// Synale power
    /// </summary>
    public class Synale : Node
    {
        #region Fields
        private RulesSet _rules = null;

        #region Signals
        /// <summary>
		/// Connect to this signal to get the init power point 
		/// </summary>
		[Signal]
        public delegate void SynaleInitialized(PowerPoint point);

        /// <summary>
        /// Update the power of the synale
        /// </summary>
        /// <param name="point"></param>
		[Signal]
        public delegate void SynalePowerUpdated(PowerPoint point);
        #endregion
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
            this._rules = this.GetRootNode<Game>("CurrentGame").RulesSet;
        }

        /// <summary>
        /// Initializes the power of the synale
        /// </summary>
        public void Initialize(PowerPoint point)
        {
            this.CurrentPower = point;
            this.EmitSignal(nameof(SynaleInitialized), point.Clone());
        }

        /// <summary>
        /// Updates the power value, and give the validity of the action
        /// </summary>
        /// <returns></returns>
        public bool ActToReborn()
        {
            int addingValue = -this._rules.RebornCost;
            
            this.CurrentPower.Add(addingValue);
            this.EmitSignal(nameof(SynalePowerUpdated), new PowerPoint(addingValue));
            return this.CurrentPower.IsValid;
        }
        #endregion

        #region Properties
        /// <summary>
        /// Current power of the synale 
        /// </summary>
        public PowerPoint CurrentPower { get; private set; }

        /// <summary>
        /// True if there is enough power
        /// </summary>
        public bool IsValid { get => this.CurrentPower.IsValid; }
        #endregion
    }
}
