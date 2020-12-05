using Godot;
using ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.Scripts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.CodeEditor.Scripts.Models.Base;

namespace ladiagonaledupoulpe.Sources.App.Shared.Scenes.CodeEditor.Scripts
{
	/// <summary>
	/// Manage all the MovingScene
	/// </summary>
	public class MovingSceneManager : BaseCompilation
	{
		#region Fields
		//private ActionPointLeftContainer _actionPointContainer;
		private BtnActionFrameContainer _btnActionFrameContainer;
		private MovingCharacter _moveCharacter;
		#endregion

		#region Public
		public override void _Ready()
		{
			_btnActionFrameContainer = this.GetNode<BtnActionFrameContainer>("FramesBtn/BtnActionFrameContainer");
			_moveCharacter = this.GetNode<MovingCharacter>("GridPlayCode");
			this.Connect(nameof(NewCompilation), _btnActionFrameContainer, nameof(BtnActionFrameContainer.InitButtonFrames));
			this.Connect(nameof(MoveCharacter), _moveCharacter, nameof(MovingCharacter.MoveCharacterByTween));
		}

        /// <summary>
        /// Action on button frame click below the grid
        /// Send information for update action point left
        /// </summary>
        /// <param name="frame"></param>
        public void on_frame_button_pressed(ActionFrame frame)
		{
			this.EmitSignal(nameof(FrameChanged), frame);
		}

		/// <summary>
		/// Action after request compilation finished succefully
		/// </summary>
		/// <param name="result"></param>
		public void Request_OnAfterCommandCompilationExecuted(HttpFramesResponse result)
		{
			this.EmitSignal(nameof(NewCompilation), result.Frames);
			this.EmitSignal(nameof(MoveCharacter), result.Frames);
		}

		#endregion
	}
}
