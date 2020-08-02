using Godot;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Server
{
	public class CodeEditor : HttpRequestManager
	{

		public  async Task TestCodePlayer(string code)
		{
			await this.SendRequest(HTTPClient.Method.Post, $"{nameof(CodeEditor)}/Validate", new { Code = code });
		}
	}
}
