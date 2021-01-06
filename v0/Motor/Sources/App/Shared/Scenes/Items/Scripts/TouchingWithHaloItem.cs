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
		this.Id = 1;
	}
	#endregion

	#region Internal methods
	private void _on_Area2D_area_entered(object area)
	{
		GD.Print("_on_Area2D_area_entered");
	}

	private void _on_Area2D_body_entered(object body)
	{
		GD.Print("_on_Area2D_body_entered");
		this._uiEvents.BeItemIsTouched(this);
	}
	#endregion

	#region Properties
	public override int Id { get => base.Id; set => base.Id = value; }
	#endregion
}

