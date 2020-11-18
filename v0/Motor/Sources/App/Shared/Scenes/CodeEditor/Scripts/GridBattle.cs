using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations;
using ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Scenes.CodeEditor.Scripts
{
    public class GridBattle : Sprite
    {

		public IList<ActionFrame> Frames { get; set; }

		private Sprite _sprite;
		private Sprite _grid;
		private BattleConfiguration _battleConfiguration;
		private FrameManager _frameManager;

		public override void _Ready()
		{
			Node node = this.GetNode<Node>("/root/Battle");
			_sprite = this.GetNode<Sprite>("Players/Poulpe");
			_grid = this;
			_frameManager = node.GetNode<FrameManager>("FramesBtn");
			_battleConfiguration = this.GetNode<GlobalDataService>("/root/GlobalDataService").GlobalSettings.Battle;
			
		}


		/// <summary>
		/// Use tween for move character to frame position
		/// </summary>
		/// <param name="positions"></param>
		private void MoveCharacterByTween()
		{
			IList<Position> positions = Frames.Select(x => x.PlayerPosition).ToList();

			Task.Run(() =>
            {
				var tween = new Tween();
				_sprite.AddChild(tween);
				for (var i = 0; i < positions.Count; i++)
				{
					int actionPointLeft = Frames[i].ActionPointLeft;
					_frameManager.EmitSignal("FrameChanged", actionPointLeft);
					float sizeLength = _grid.Texture.GetSize().x / _battleConfiguration.GridWidth;
					float sizeheight = _grid.Texture.GetSize().y / _battleConfiguration.GridHeight;

					Vector2 origin = new Vector2(positions[i].X * sizeLength, positions[i].Y * sizeheight);
					Vector2 destination = new Vector2(positions[i + 1].X * sizeLength, positions[i + 1].Y * sizeheight);

					tween.InterpolateProperty(_sprite, "position", origin, destination, 0.5f, Tween.TransitionType.Linear, Tween.EaseType.InOut);
					tween.Start();
					while (tween.IsActive())
					{
					}

				}
				_sprite.RemoveChild(tween);

			});

		
		}

	}
}
