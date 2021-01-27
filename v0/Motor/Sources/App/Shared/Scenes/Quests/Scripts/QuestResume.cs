using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;

/// <summary>
/// Displays one quest
/// </summary>
public class QuestResume : Node2D
{
	#region Fields
	private RichTextLabel _title = null;
	private Sprite _achievedSprite = null;
	private Sprite _notAchievedSprite = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		this._title = this.GetNode<RichTextLabel>("Title");
		this._achievedSprite = this.GetNode<Sprite>("Achieved");
		this._notAchievedSprite = this.GetNode<Sprite>("NotAchieved");
	}

	/// <summary>
	/// Displays the item in the current node
	/// </summary>
	/// <param name="quest"></param>
	public void Display(IQuest quest)
	{
		this.Item = quest;

		this._title.BbcodeEnabled = true;
		this._title.BbcodeText = quest.Name;
		this._achievedSprite.Visible = this.Item.IsAchieved;
		this._notAchievedSprite.Visible = ! this.Item.IsAchieved;
	}
	#endregion

	#region Properties
	public IQuest Item { get; private set; }
	#endregion
}
