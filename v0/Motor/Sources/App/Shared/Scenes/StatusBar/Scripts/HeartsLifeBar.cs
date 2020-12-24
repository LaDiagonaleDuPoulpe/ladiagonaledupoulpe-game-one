using Godot;
using System;

/// <summary>
/// Life bar with 3 hearts (hearts of each octopus)
/// Container that manages life with : one main heart and two helper hearts
/// </summary>
public class HeartsLifeBar : Node2D
{
	#region Fields
	private HeartBar _mainHeart = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		Control container = this.GetNode<Control>("MarginContainer"); 
		this._mainHeart = container.GetNode<HeartBar>("MainHeart");
	}

	/// <summary>
	/// Initializes life point
	/// </summary>
	public void Initialize(int value, int maxValueOfPlayer)
	{
		this._mainHeart.Initialize(value, maxValueOfPlayer);
	}

	/// <summary>
	/// Updates value in all heart bars
	/// </summary>
	/// <param name="value">Positive value of the value of life of player</param>
	/// <param name="maxValueOfPlayer">Maximum life of the player</param>
	public void Update(int value, int maxValueOfPlayer)
	{
		this._mainHeart.Update(value, maxValueOfPlayer);
	}
	#endregion

	#region Properties
	/// <summary>
	/// Min health of the octopus
	/// </summary>
	public int CurrentHealth
	{
		get => this._mainHeart.CurrentValue;
	}

	/// <summary>
	/// Max health of the octopus
	/// </summary>
	[Export]
	public int MaxHealth
	{
		get => this._mainHeart.MaxValue;
		set => this._mainHeart.MaxValue = value;
	}
	#endregion
}
