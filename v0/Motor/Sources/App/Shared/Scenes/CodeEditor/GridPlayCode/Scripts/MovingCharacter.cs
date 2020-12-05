using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.CodeEditor.Scripts.Players;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Scenes.CodeEditor.Scripts
{
	/// <summary>
	/// Moving character on the grid
	/// </summary>
	public class MovingCharacter : Node
	{

        #region Fields
        private PlayerActionGrid _player;
		private BattleConfiguration _battleConfiguration;
		private Sprite _grid;
        #endregion
        public override void _Ready()
		{
			_player = this.GetNode<PlayerActionGrid>("Players/Player");
			_battleConfiguration = this.GetNode<GlobalDataService>("/root/GlobalDataService").GlobalSettings.Battle;
			_grid = this.GetNode<Sprite>("Grid");
		}

        #region Public
        /// <summary>
        /// Use tween for move character to frame position
        /// </summary>
        /// <param name="positions"></param>
        public void MoveCharacterByTween(Godot.Collections.Array<ActionFrame> Frames)
		{
			IList<Position> positions = Frames.Select(x => x.PlayerPosition).ToList();
			var tween = new Tween();
			_player.AddChild(tween);
			Task.Run(() =>
			{
				
				for (var i = 0; i < positions.Count; i++)
				{
					int actionPointLeft = Frames[i].ActionPointLeft;
			
					float sizeLength = _grid.Texture.GetSize().x / _battleConfiguration.GridWidth;
					float sizeheight = _grid.Texture.GetSize().y / _battleConfiguration.GridHeight;

					Vector2 origin = new Vector2(positions[i].X * sizeLength, positions[i].Y * sizeheight);
					Vector2 destination = new Vector2(positions[i + 1].X * sizeLength, positions[i + 1].Y * sizeheight);

					tween.InterpolateProperty(_player, "position", origin, destination, 0.5f, Tween.TransitionType.Linear, Tween.EaseType.InOut);
					tween.Start();
					while (tween.IsActive())
					{
					}

				}
				_player.RemoveChild(tween);
				tween.QueueFree();
			});

		
		}
		#endregion

	}
}
