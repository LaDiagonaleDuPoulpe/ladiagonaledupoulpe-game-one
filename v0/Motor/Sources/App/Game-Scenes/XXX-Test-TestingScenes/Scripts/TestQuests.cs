using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Models.Games;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Goals;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using System;

public class TestQuests : BaseActiveScene
{
	#region Fields
	private Game _game = null;
	private QuestEvents _questEvents = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		base._Ready();

		this._questEvents = this.GetNode<QuestEvents>("/root/QuestEvents");
		this._questEvents.AttachGoalIsDone(this, nameof(questEvents_GoalIsDone));
		this._questEvents.AttachQuestIsDone(this, nameof(questEvents_QuestIsDone));
	}
	#endregion

	#region Internal methods
	private void questEvents_GoalIsDone(Goal goal)
	{
		GD.Print("goal is done");
	}

	private void questEvents_QuestIsDone(Goal goal)
	{
		GD.Print("quest is done");
	}

	private void _on_btnActivate_pressed()
	{
		this._game.Story[0][0].Activate();
		GD.Print(this._game.Story[0][0].IsActive);
	}
	#endregion

	#region Properties
	public override bool RootNodesVisibility => true;
	#endregion
}

