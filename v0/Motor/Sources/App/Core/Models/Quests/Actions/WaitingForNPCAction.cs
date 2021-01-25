using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Actions
{
    /// <summary>
    /// Action taht allows you to wait for one specific event emit
    /// </summary>
    public class WaitingForNPCAction : BaseQuestAction
    {
        #region Fields
        private NonPlayerCharacterEvents _nonPlayerCharacterEvents = null;
        #endregion

        #region Constructors
        public WaitingForNPCAction(int npcId, IQuest lastQuest) : this(npcId, lastQuest, null) {}

        public WaitingForNPCAction(int npcId, IQuest lastQuest, IQuestAction next) : base(lastQuest, next)
        {
            this.NpcId = npcId;
        }
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();
            this._nonPlayerCharacterEvents = this.GetRootNode<NonPlayerCharacterEvents>();
        }
        #endregion

        #region Internal methods
        protected override void DoRun()
        {
            this._nonPlayerCharacterEvents.AttachCharacterTouched(this, nameof(NonPlayerCharacterEvents_CharacterTouched));
        }

        private void NonPlayerCharacterEvents_CharacterTouched(BaseCharacter character)
        {
            if (this.NpcId == character.Id)
            {
                this._nonPlayerCharacterEvents.DetachCharacterTouched(this, nameof(NonPlayerCharacterEvents_CharacterTouched));
                this.GetRootNode<QuestEvents>().BeNextRequestIntended();
            }
        }
        #endregion

        #region Properties
        /// <summary>
        /// Gets the searching id of character
        /// </summary>
        public int NpcId { get; private set; }
        #endregion
    }
}
