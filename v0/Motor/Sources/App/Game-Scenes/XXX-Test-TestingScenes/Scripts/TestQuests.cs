using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Goals;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;

public class TestQuests : BaseActiveScene
{
	#region Fields
	private IChapter _chapter = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		base._Ready();
		this._chapter = new Chapter(1, "Sortir du vaisseau");

		Quest quest = new Quest(1, "Wake up the IA", "IA is broken, try to reboot her");
		quest.AddRewards(new QuestReward(), new QuestReward());
		quest.Add(new TouchedItemGoal(1));

		this.AddChild(quest);

		this._chapter.Add(quest);
	}
	#endregion

	#region Internal methods
	private void _on_btnActivate_pressed()
	{
		this._chapter[0].Activate();
		GD.Print(this._chapter[0].IsActive);
	}
	#endregion

	#region Properties
	public override bool RootNodesVisibility => true;
	#endregion
}

