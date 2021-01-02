using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Quests
{
    /// <summary>
    /// Default goal : main base class
    /// </summary>
    public abstract class Goal : Node, IGoal
    {
        #region Fields
        private bool _isAchieved = false;
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();
        }

        public virtual bool Evaluate()
        {
            return this._isAchieved;
        }
        #endregion

        #region Internal methods
        /// <summary>
        /// Defines this method to initialize the goal
        /// </summary>
        protected abstract void DoInitialize();
        #endregion

        #region Properties
        public bool IsAchieved => this._isAchieved;
        #endregion
    }
}
