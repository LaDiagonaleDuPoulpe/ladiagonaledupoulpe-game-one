using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Actions
{
    /// <summary>
    /// Action to start a dialog 
    /// </summary>
    public class ActivateDialogAction : BaseQuestAction
    {
        #region Fields
        private int _dialogId = 0;
        #endregion

        #region Constructors
        public ActivateDialogAction(int dialogId, IQuest lastQuest) : this(dialogId, lastQuest, null)
        {
        }

        public ActivateDialogAction(int dialogId, IQuest lastQuest, IQuestAction next) : this(dialogId, lastQuest, null, null)
        {
        }

        public ActivateDialogAction(int dialogId, IQuest lastQuest, IQuest nextQuest, IQuestAction next = null) : base(lastQuest, nextQuest, next)
        {
            this._dialogId = dialogId;
        }
        #endregion

        #region Internal methods

        protected override void DoRun()
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
