using Godot;
using System;

public class AutoloaderPoc : Node2D
{
	#region Fields
	private Node2D _currentNode = null;
	public bool isPassingByReady = false;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		this._currentNode = this.GetNode<Node2D>("Child");
		this.isPassingByReady = true;
	}
	#endregion

	#region Properties
	
	#endregion
}
