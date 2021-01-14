using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Rewards;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using System;

public class DisplayRewards : Node2D
{
	#region Fields
	private ScrollContainer _container = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		this.GetNode<QuestEvents>("/root/QuestEvents").AttachRewardsArePublishing(this, nameof(QuestEvents_RewardsArePublishing));
		this.Visible = false;
		this._container = this.GetNode<ScrollContainer>("ScrollContainer");
	}
	#endregion

	#region Internal methods
	private void QuestEvents_RewardsArePublishing(Godot.Collections.Array<QuestReward> items)
	{
		this.Visible = true;
		this.RemoveAllOldies();
		this.Display(items);
	}

	private void RemoveAllOldies()
    {

    }

	private void Display(Godot.Collections.Array<QuestReward> items)
	{
		Panel panel = this._container.GetNode<Panel>("Panel");

		foreach (var item in items)
		{
			var scene = GD.Load<PackedScene>("res://Sources/App/Shared/Scenes/Rewards/OneReward/OneReward.tscn");
			panel.AddChild(scene.Instance());
		}
	}
	#endregion
}
