using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;

/// <summary>
/// Displays one quest
/// </summary>
public class QuestResume : Node2D
{
	#region Public methods
	public override void _Ready()
	{

	}

	/// <summary>
	/// Displays the item in the current node
	/// </summary>
	/// <param name="quest"></param>
	public void Display(IQuest quest)
	{
		this.Item = quest;
	}
	#endregion

	#region Properties
	public IQuest Item { get; private set; }
	#endregion
}
