using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Actions
{
    /// <summary>
    /// Action taht allows you to wait for one specfic event emit
    /// </summary>
    public class WaitingForNPCAction : BaseQuestAction
    {
        #region Constructors
        public WaitingForNPCAction(IQuest lastQuest, IQuest nextQuest, IQuestAction next = null) : base(lastQuest, nextQuest, next)
        {
        }

        public WaitingForNPCAction(IQuest lastQuest) : base(lastQuest)
        {
        }

        public WaitingForNPCAction(IQuest lastQuest, IQuestAction next) : base(lastQuest, next)
        {
        }
        #endregion

        #region Internal methods
        protected override void DoRun()
        {
            
        }
        #endregion
    }
}
