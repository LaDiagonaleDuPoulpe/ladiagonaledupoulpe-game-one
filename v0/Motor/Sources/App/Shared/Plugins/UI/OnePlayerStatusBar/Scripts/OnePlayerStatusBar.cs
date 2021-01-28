using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;
using System;

/// <summary>
/// Status bar for all infos of one player (lifebar, synale power, ...)
/// </summary>
public class OnePlayerStatusBar : Node2D
{
	#region Fields
	private HeartsLifeBar _lifeBar = null;
	private SynaleBar _synaleBar = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		CanvasLayer layer = this.GetNode<CanvasLayer>("CanvasLayer");
		this._lifeBar = layer.GetNode<HeartsLifeBar>("HeartsLifeBar");
		this._synaleBar = layer.GetNode<SynaleBar>("SynaleBar");

		this.AttachToEvents();
	}

	public void InitializeLife(Godot.Object sender, LifePoint point)
	{
		this._lifeBar.Initialize(point.CurrentValue, point.MaxValue);
	}

	public void LifeChanged(Godot.Object sender, LifePoint point)
	{
		this._lifeBar.Update(point.CurrentValue, point.MaxValue);
	}

	public void InitializeSynale(Godot.Object sender, PowerPoint point)
	{
		this._synaleBar.Initialize(point);
	}

	public void SynalePowerChanged(Godot.Object sender, PowerPoint addingPoint)
	{
		this._synaleBar.UpdatePower(addingPoint);
	}

	/// <summary>
	/// Defines visibility of the component
	/// </summary>
	public void SetVisibility(bool isVisible)
	{
		this._lifeBar.Visible = isVisible;
		this.Visible = isVisible;
		this._synaleBar.Visible = isVisible;
	}
	#endregion

	#region Internal methods
	private void AttachToEvents()
	{
		HealthCharacterEvents characterEvents = this.GetRootNode<EventsProxy>().HealthCharacterEvents;
		characterEvents.AttachToInitialize(this, nameof(InitializeLife));
		characterEvents.AttachToChange(this, nameof(LifeChanged));

		SynaleEvents synaleEvents = this.GetRootNode<EventsProxy>().SynaleEvents;
		synaleEvents.AttachToInitialize(this, nameof(InitializeSynale));
		synaleEvents.AttachToUpdate(this, nameof(SynalePowerChanged));
	}
	#endregion
}
