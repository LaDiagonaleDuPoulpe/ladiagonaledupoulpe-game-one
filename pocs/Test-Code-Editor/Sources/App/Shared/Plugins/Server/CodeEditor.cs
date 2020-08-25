using Godot;
using ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.scripts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Server
{
	public class CodeEditor : HttpRequestManager
	{

		public async Task Compile(string code, Action<IList<Frame>> action)
		{
			await this.SendRequest<IList<Frame>>(HTTPClient.Method.Post, $"{nameof(CodeEditor)}/Compile", code, (frames)=> {
				action(frames);
				return;
			}, () => { return; });
		}
	}
}
