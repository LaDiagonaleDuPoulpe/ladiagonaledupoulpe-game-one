using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Items;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using System;

/// <summary>
/// Use this item to present an item with halo when player is near to the item
/// </summary>
public class TouchingWithHaloItem : BaseItem
{
	#region Fields
	private ItemsEvents _uiEvents = null;
	#endregion  

	#region Public methods
	public override void _Ready()
	{
		base._Ready();
		this._uiEvents = this.GetNode<ItemsEvents>("/root/ItemsEvents");
	}
	#endregion

	#region Internal methods
	private void _on_Area2D_area_entered(object area) {}

	private void _on_Area2D_body_entered(object body)
	{
		GD.Print("TouchingWithHaloItem => ", this.Id);
		this._uiEvents.BeItemIsTouched(this);
	}
	#endregion

	#region Properties
	[Export]
	public override int Id { get => base.Id; set => base.Id = value; }
	#endregion
}

