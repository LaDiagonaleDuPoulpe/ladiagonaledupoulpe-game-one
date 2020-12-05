using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Scenes.CodeEditor.Scripts.Players
{
	/// <summary>
	/// Player animation
	/// </summary>
	public class PlayerActionGrid : Player
	{
		private Vector2 _oldPosition;
		public override void _Ready()
		{
			base._Ready();
			_oldPosition = this.Position;

		}

		/// <summary>
		/// Override state pattern for execute animation on position changed,
		/// Not on move button pressed (up, down,left, right)
		/// </summary>
		/// <param name="delta"></param>
		public override void _PhysicsProcess(float delta)
		{
			if (this.CanMove)
			{
				Vector2 vector = Vector2.Zero;

				vector.x = this.Position.x - _oldPosition.x ;
				vector.y = this.Position.y -  _oldPosition.y ;

				this.Velocity = Vector2.Zero;
				if (vector != Vector2.Zero)
				{
					this.Velocity = vector;
				}

			}
			_oldPosition = this.Position;
		}
	}
}
