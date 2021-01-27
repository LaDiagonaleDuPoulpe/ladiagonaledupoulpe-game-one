using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;
using System;

/// <summary>
/// DIsplays quest list of chapters in the current story
/// </summary>
public class QuestList : Node2D
{
	#region Fields
	private QuestEvents _questEvents = null;
	private HBoxContainer _container = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		this._questEvents = this.GetRootNode<QuestEvents>();
		this._container = this.GetNode<MarginContainer>("MarginContainer").GetNode<HBoxContainer>("HBoxContainer");
	}

	/// <summary>
	/// Display current chapter and its quests
	/// </summary>
	/// <param name="story"></param>
	public void Display(IStory story)
	{
		this.RemoveAllOldies();

		ChapterResume chapterNode = this.ToInstance<ChapterResume>("Quests/ChapterResume");
		this._container.AddChild(chapterNode);
		chapterNode.Display(story.CurrentChapter);
	}
	#endregion

	#region Internal methods
	private void RemoveAllOldies()
	{
		this._container.RemoveAllOldies();
	}

	private void _on_BtnClose_pressed()
	{
		this._questEvents.BeShowQuests(false);
	}
	#endregion
}

