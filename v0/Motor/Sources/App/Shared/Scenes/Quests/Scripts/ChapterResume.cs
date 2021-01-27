using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;
using System;

/// <summary>
/// Displays one chapter
/// </summary>
public class ChapterResume : Node2D
{
	#region Fields
	private RichTextLabel _title = null;
	private HBoxContainer _container = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		this._title = this.GetNode<RichTextLabel>("Title");
		this._container = this.GetNode<MarginContainer>("MarginContainer").GetNode<HBoxContainer>("HBoxContainer");
	}

	/// <summary>
	/// Displays the item in the current node
	/// </summary>
	/// <param name="chapter"></param>
	public void Display(IChapter chapter)
	{
		this._container.RemoveAllOldies();

		this.Item = chapter;
		if (this.Item != null)
		{
			this._title.BbcodeText = this.Item.Title;
			this.DisplayQuests();
		}
	}
	#endregion

	#region Internal methods
	private void DisplayQuests()
	{
		int positionX = 0;
		int positionY = 0;
		foreach (var quest in this.Item)
		{
			Vector2 newPosition = new Vector2(positionX, positionY);
			this.DisplayOneQuest(quest, newPosition);

			positionX += 500;
		}
	}

	private void DisplayOneQuest(IQuest quest, Vector2 newPosition)
	{
		QuestResume questResume = this.ToInstance<QuestResume>("Quests/QuestResume");
		questResume.Position = newPosition;
		this._container.AddChild(questResume);
		questResume.Display(quest);
	}
	#endregion

	#region Properties
	public IChapter Item { get; private set; }
	#endregion
}
