using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;
using System;

/// <summary>
/// DIsplays quest list of chapters in the current story
/// </summary>
public class QuestList : Node2D
{
	#region Public methods
	public override void _Ready()
	{
		
	}
	#endregion

	#region Internal methods
	private void _on_BtnClose_pressed()
	{
		this.GetRootNode<QuestEvents>().BeShowQuests(false);
	}
	#endregion
}

