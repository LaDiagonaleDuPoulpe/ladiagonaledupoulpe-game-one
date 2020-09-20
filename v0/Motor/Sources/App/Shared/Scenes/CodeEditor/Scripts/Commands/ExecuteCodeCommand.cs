using Godot;
using ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.scripts.Models.Commands
{
	/// <summary>
	/// Execute action player after request compilation player code
	/// </summary>
	public class ExecuteCodeCommand : Node2D, ICommand
	{
		private readonly Sprite _sprite;

		public ExecuteCodeCommand(Sprite sprite)
		{
			_sprite = sprite;
		}

        public ICommand NextCommand { get; set; }

        public void Execute(IHttpResponse response)
		{
			var httpResponse = (HttpFramesResponse)response;
			IList<ActionFrame> frames = httpResponse.Frames;
			IList<Position> positions = frames.Select(x=> x.PlayerPosition).ToList();
			Task.Run(()=> ExecuteTween(positions));
		}
	
	
		/// <summary>
		/// Use tween for move character to frame position
		/// </summary>
		/// <param name="positions"></param>
		private void ExecuteTween(IList<Position> positions){

			var tween = new Tween();
			_sprite.AddChild(tween);
			
			for (var i = 0; i < positions.Count; i++)
			{

				Vector2 origin = new Vector2(positions[i].X, positions[i].Y);
				Vector2 destination = new Vector2(positions[i + 1].X, positions[i + 1].Y);

				tween.InterpolateProperty(_sprite, "position", origin, destination, 0.3f, Tween.TransitionType.Linear, Tween.EaseType.InOut);
				tween.Start();
				while (tween.IsActive())
				{

				}

			}
			_sprite.RemoveChild(tween);
		}
	
	}
}
