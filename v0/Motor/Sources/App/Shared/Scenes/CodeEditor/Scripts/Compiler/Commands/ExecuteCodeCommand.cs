using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes.Request;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.CodeEditor.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.scripts.Compiler.Models.Commands
{
	/// <summary>
	/// Execute action player after request compilation player code
	/// </summary>
	public class ExecuteCodeCommand : Node, ICommand
	{
		#region Fields
		private FrameManager _frameManager;
		#endregion
		

		public ICommand NextCommand { get; set; }


		#region Public 

		public override void _Ready()
		{
			Node node = this.GetNode<Node>("/root/Battle");
			_frameManager = node.GetNode<FrameManager>("FramesBtn");
		}


		public void Execute(IHttpResponse response)
		{
			var httpResponse = (HttpFramesResponse)response;
			IList<ActionFrame> frames = httpResponse.Frames;
			_frameManager.SetFrames(frames);

		}
		#endregion


		
	}
}
