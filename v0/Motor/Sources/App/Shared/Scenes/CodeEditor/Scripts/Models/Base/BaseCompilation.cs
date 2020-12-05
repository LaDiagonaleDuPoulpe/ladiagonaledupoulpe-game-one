using Godot;
using ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.Scripts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Scenes.CodeEditor.Scripts.Models.Base
{
    public class BaseCompilation : Node2D
    {
		[Signal]
		public delegate void FrameChanged(ActionFrame frame);
		[Signal]
		public delegate void NewCompilation(Godot.Collections.Array<ActionFrame> frames);
		[Signal]
		public delegate void MoveCharacter(Godot.Collections.Array<ActionFrame> frames);
		[Signal]
		public delegate void Compilate();
	}
}
