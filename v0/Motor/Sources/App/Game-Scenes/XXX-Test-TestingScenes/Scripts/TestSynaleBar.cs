using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using System;

public class TestSynaleBar : BaseActiveScene
{
	#region Fields
	private SynaleBar _synaleBar = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		base._Ready();

		this._synaleBar = this.GetNode<SynaleBar>("SynaleBar");
		this._synaleBar.Initialize(new PowerPoint(100));
	}
	#endregion

	#region Internal methods
	private void _on_ButtonPlus20_pressed()
	{
		this._synaleBar.Increase(new PowerPoint(20));
	}

	private void _on_Button2Less20_pressed()
	{
		this._synaleBar.Decrease(new PowerPoint(20));
	}
	#endregion

	#region Properties
	public override bool RootNodesVisibility => false;
	#endregion
}



