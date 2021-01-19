using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Models.Games;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Goals;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;
using System;

public class TestQuests : BaseActiveScene
{
	#region Fields
	private Game _game = null;
	private QuestEvents _questEvents = null;
	private PathFollow2D _pathFollow2D = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		base._Ready();

		this.GetRootNode<Game>("CurrentGame").Story.Start();

		this._questEvents = this.GetRootNode<QuestEvents>();
		this._questEvents.AttachGoalIsDone(this, nameof(questEvents_GoalIsDone));
		this._questEvents.AttachQuestIsDone(this, nameof(questEvents_QuestIsDone));
		this._questEvents.AttachNewQuestActivated(this, nameof(questEvents_NewQuestActivated));

		this._pathFollow2D = this.GetNode<Path2D>("Path2D").GetNode<PathFollow2D>("PathFollow2D");
	}

	public override void _PhysicsProcess(float delta)
	{
		base._PhysicsProcess(delta);
		this._pathFollow2D.Offset += 35 * delta; 
	}
	#endregion

	#region Internal methods
	private void questEvents_NewQuestActivated(Quest quest)
	{
		GD.Print("new quest is activated ", quest.Name);
	}

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

