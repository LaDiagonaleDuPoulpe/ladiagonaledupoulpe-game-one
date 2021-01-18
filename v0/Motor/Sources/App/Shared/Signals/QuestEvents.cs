using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Rewards;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Signals
{
    /// <summary>
    /// Use this class to manage all events about the quests actions
    /// This class is used in autoplayer singleton
    /// </summary>
    public class QuestEvents : Godot.Node
    {
		#region Fields
		#region Signals
		/// <summary>
		/// Raised when one quest is done
		/// </summary>
		[Signal]
		public delegate void QuestAccomplished(Quest item);

		/// <summary>
		/// Raised when getting a list of rewards
		/// </summary>
		/// <param name="rewards"></param>
		[Signal]
		public delegate void RewardsPublishing(Godot.Collections.Array<QuestReward> rewards);

		/// <summary>
		/// Raised when all rewards have been collected 
		/// </summary>
		[Signal]
		public delegate void RewardsHaveBeenCollected();
		
		/// <summary>
		/// Raised when one goal is done
		/// </summary>
		/// <param name="item"></param>
		[Signal]
		public delegate void GoalAccomplished(Goal item);
		#endregion
		#endregion

		#region Public methods
		/// <summary>
		/// Allows you to be attached to the event
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="methodName"></param>
		public void AttachRewardsHaveBeenCollected(Godot.Object sender, string methodName)
		{
			this.Connect(nameof(RewardsHaveBeenCollected), sender, methodName);
		}

		/// <summary>
		/// One item is touched, raises the signal
		/// </summary>
		/// <param name="sender"></param>
		public void BeRewardsHaveBeenCollected()
		{
			this.EmitSignal(nameof(RewardsHaveBeenCollected));
		}

		/// <summary>
		/// Allows you to be attached to the event
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="methodName"></param>
		public void AttachRewardsArePublishing(Godot.Object sender, string methodName)
		{
			this.Connect(nameof(RewardsPublishing), sender, methodName);
		}

		/// <summary>
		/// One item is touched, raises the signal
		/// </summary>
		/// <param name="sender"></param>
		public void BeRewardsPublishing(Godot.Collections.Array<QuestReward> senders)
		{
			this.EmitSignal(nameof(RewardsPublishing), senders);
		}

		/// <summary>
		/// Allows you to be attached to the event
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="methodName"></param>
		public void AttachQuestIsDone(Godot.Object sender, string methodName)
		{
			this.Connect(nameof(QuestAccomplished), sender, methodName);
		}

		/// <summary>
		/// One item is touched, raises the signal
		/// </summary>
		/// <param name="sender"></param>
		public void BeQuestIsDone(Quest sender)
		{
			this.EmitSignal(nameof(QuestAccomplished), sender);
		}

		/// <summary>
		/// Allows you to be attached to the event
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="methodName"></param>
		public void AttachGoalIsDone(Godot.Object sender, string methodName)
		{
			this.Connect(nameof(GoalAccomplished), sender, methodName);
		}

		/// <summary>
		/// One item is touched, raises the signal
		/// </summary>
		/// <param name="sender"></param>
		public void BeGoalIsDone(Goal sender)
		{
			this.EmitSignal(nameof(GoalAccomplished), sender);
		}
		#endregion
	}
}
