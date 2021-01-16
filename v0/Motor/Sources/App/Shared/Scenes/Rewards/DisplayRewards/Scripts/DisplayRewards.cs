using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Rewards;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using System;

public class DisplayRewards : Node2D
{
	#region Fields
	private MarginContainer _container = null;
	private HBoxContainer _subContainer = null;
	private QuestEvents _questEvents = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		this._questEvents = this.GetNode<QuestEvents>("/root/QuestEvents");
		this._questEvents.AttachRewardsArePublishing(this, nameof(QuestEvents_RewardsArePublishing));

		this.Visible = false;
		
		this._container = this.GetNode<MarginContainer>("MarginContainer");
		this._subContainer = this._container.GetNode<HBoxContainer>("HBoxContainer");
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
		foreach (var item in this._subContainer.GetChildren())
		{
			Node node = item as Node;
			this._subContainer.RemoveChild(node);
			node.QueueFree();
		}
	}

	private void Display(Godot.Collections.Array<QuestReward> items)
	{
		int positionX = 0;
		int positionY = 0;

		foreach (var item in items)
		{
			var scene = GD.Load<PackedScene>("res://Sources/App/Shared/Scenes/Rewards/OneReward/OneReward.tscn");
			OneReward instance = scene.Instance() as OneReward;

			instance.ZIndex = 10;
			instance.Position = new Vector2(positionX, positionY);
			
			this._subContainer.AddChild(instance);

			positionX += 50;
		}
	}

	private void _on_Button_pressed()
	{
		this._questEvents.BeRewardsHaveBeenCollected();
	}
	#endregion
}
