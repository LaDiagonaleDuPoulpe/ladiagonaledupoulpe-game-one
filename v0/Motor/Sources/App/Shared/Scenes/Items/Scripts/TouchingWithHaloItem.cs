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
	private Sprite _hightLight = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		base._Ready();
		this._uiEvents = this.GetNode<ItemsEvents>("/root/ItemsEvents");
		this._hightLight = this.GetNode<Area2D>("ActiveArea").GetNode<Sprite>("HightLight");
	}
	#endregion

	#region Internal methods
	private void _on_Area2D_area_entered(object area) {}

	private void _on_Area2D_body_entered(object body)
	{
		this._uiEvents.BeItemIsTouched(this);
	}

	private void _on_RayShapeArea_body_entered(object body)
	{
		this._hightLight.Visible = true;
	}

	private void _on_RayShapeArea_body_exited(object body)
	{
		this._hightLight.Visible = false;
	}
	#endregion

	#region Properties
	[Export]
	public override int Id { get => base.Id; set => base.Id = value; }
	#endregion
}
