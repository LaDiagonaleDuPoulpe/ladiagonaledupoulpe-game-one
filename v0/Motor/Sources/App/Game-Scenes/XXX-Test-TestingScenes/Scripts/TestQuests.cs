using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins.Quests;
using System;

public class TestQuests : Node2D
{
	#region Public methods
	public override void _Ready()
	{
		IChapter chapter = new Chapter();

		IQuest quest = new Quest(1, "Wake up the IA", "IA is broken, try to reboot her");
		quest.AddRewards(new QuestReward(), new QuestReward());

		chapter.Add(quest);

	}
    #endregion

    #region Internal methods
    private void _on_Button_pressed()
	{
		// Replace with function body.
	}
    #endregion
}



