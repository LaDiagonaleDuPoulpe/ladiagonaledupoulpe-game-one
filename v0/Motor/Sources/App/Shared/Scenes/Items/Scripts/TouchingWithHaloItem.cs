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
	private UIEvents _uiEvents = null;
	#endregion  

	#region Public methods
	public override void _Ready()
	{
		this._uiEvents = this.GetNode<UIEvents>("/root/UIEvents");
	}
	#endregion

	#region Internal methods
	private void _on_Area2D_area_entered(object area)
	{
		this._uiEvents.BeItemIsTouched(this);
	}
	#endregion
}



