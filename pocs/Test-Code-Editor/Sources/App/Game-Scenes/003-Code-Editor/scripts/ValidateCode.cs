using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins.Server;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.scripts
{
	public class ValidateCode : Node
	{
	
		private void _on_Button_pressed()
		{
			var serverManager = GetTree().Root.GetNode<ServerManager>("ServerManager");

			//string code = GetTree().Root.GetNode<TextEdit>("Node2D/TxtCodePlayer").Text;
			//GD.Print(code);
			Task.Run( ()=> serverManager.CodeEditor.TestCodePlayer("code"));
		}

	}

}


