using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Models.Games;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Goals;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;

public class TestQuests : BaseActiveScene
{
	#region Fields
	private Game _game = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		base._Ready();
		IChapter chapter = new Chapter(1, "Sortir du vaisseau");

		Quest quest = new Quest(1, "Wake up the IA", "IA is broken, try to reboot her");
		quest.AddRewards(new QuestReward(), new QuestReward());
		quest.Add(new TouchedItemGoal(1, quest));

		this.AddChild(quest);

		chapter.Add(quest);

		this._game = this.GetNode<Game>("/root/CurrentGame");
		this._game.Story.Add(chapter);
	}
	#endregion

	#region Internal methods
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

