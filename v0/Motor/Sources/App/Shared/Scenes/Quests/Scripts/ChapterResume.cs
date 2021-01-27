using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;

/// <summary>
/// Displays one chapter
/// </summary>
public class ChapterResume : Node2D
{
	#region Public methods
	public override void _Ready()
	{

	}

	/// <summary>
	/// Displays the item in the current node
	/// </summary>
	/// <param name="chapter"></param>
	public void Display(IChapter chapter)
	{
		this.Item = chapter;
	}
	#endregion

	#region Properties
	public IChapter Item { get; private set; }
	#endregion
}
