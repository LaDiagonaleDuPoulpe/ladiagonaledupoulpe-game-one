using Godot;
using ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.Scripts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Scenes.CodeEditor.Scripts
{
	public class FrameManager : Node
	{
		#region Fields
		private ActionPointLeftContainer _actionPointContainer;
		private BtnActionFrameContainer _btnActionFrameContainer;
		private GridBattle _moveCharacter;
		private IList<ActionFrame> _frames { get; set; }
		#endregion

		[Signal]
		public delegate void FrameChanged(int actionPointLeft);

		[Signal]
		public delegate void NewCompilation();
		[Signal]
		public delegate void MoveCharacter();
		#region Public
		public override void _Ready()
		{
			_actionPointContainer = this.GetNode<ActionPointLeftContainer>("ActionPointLeftContainer");
			_btnActionFrameContainer = this.GetNode<BtnActionFrameContainer>("BtnActionFrameContainer");
			_moveCharacter = GetTree().Root.GetNode<GridBattle>("Battle/Grid");
			this.Connect(nameof(NewCompilation), _btnActionFrameContainer, "InitButtonFrames");
			this.Connect(nameof(MoveCharacter), _moveCharacter, "MoveCharacterByTween");
		}

		public void SetFrames(IList<ActionFrame> frames)
		{
			_frames = frames;
			_actionPointContainer.Frames = frames;
			_btnActionFrameContainer.Frames = frames;
			_moveCharacter.Frames = frames;
			this.Connect(nameof(FrameChanged), _actionPointContainer, "SetActionPointLeft");
			this.EmitSignal(nameof(NewCompilation));
			this.EmitSignal(nameof(MoveCharacter));

		}
		#endregion
	}
}
