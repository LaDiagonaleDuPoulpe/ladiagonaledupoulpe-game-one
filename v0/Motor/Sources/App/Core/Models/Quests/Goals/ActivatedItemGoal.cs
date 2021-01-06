using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Goals
{
    /// <summary>
    /// Use this class to reach a goal when the player has activated one item
    /// </summary>
    public class ActivatedItemGoal : Goal
    {
        #region Constructors
        public ActivatedItemGoal(IQuest quest) : base(quest)
        {
        }
        #endregion

        #region Internal methods
        protected override void DoInitialize()
        {
            // TODO: 02/01/2021: to be finished
        }
        #endregion
    }
}
