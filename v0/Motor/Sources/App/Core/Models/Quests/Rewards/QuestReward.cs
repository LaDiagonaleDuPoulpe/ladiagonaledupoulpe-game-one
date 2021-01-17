using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Rewards
{
    /// <summary>
    /// When a quest is finished, it's the list of items, xp, ... to get
    /// </summary>
    public class QuestReward : Godot.Object, IQuestReward
    {
        #region Properties
        public int Id { get; set; }
        #endregion
    }
}
