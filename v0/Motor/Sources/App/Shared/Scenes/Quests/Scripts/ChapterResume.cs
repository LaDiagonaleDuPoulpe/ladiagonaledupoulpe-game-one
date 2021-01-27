using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;

/// <summary>
/// Displays one chapter
/// </summary>
public class ChapterResume : Node2D
{
	#region Fields
	private RichTextLabel _title = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		this._title = this.GetNode<RichTextLabel>("Title");
	}

	/// <summary>
	/// Displays the item in the current node
	/// </summary>
	/// <param name="chapter"></param>
	public void Display(IChapter chapter)
	{
		this.Item = chapter;
		if (this.Item != null)
		{
			this._title.BbcodeText = chapter.Title;
			this.DisplayQuests();
		}
	}
    #endregion

    #region Internal methods
	private void DisplayQuests()
    {
		
    }
	#endregion

	#region Properties
	public IChapter Item { get; private set; }
	#endregion
}
