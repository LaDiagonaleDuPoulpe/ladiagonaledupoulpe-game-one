using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Quests
{
    /// <summary>
    /// Default goal : main base class
    /// </summary>
    public abstract class Goal : IGoal
    {
        #region Fields
        private bool _isAchieved = false;
        #endregion

        #region Public methods
        public bool Evaluate()
        {
            return this._isAchieved;
        }
        #endregion

        #region Properties
        public bool IsAchieved => this._isAchieved;
        #endregion
    }
}
