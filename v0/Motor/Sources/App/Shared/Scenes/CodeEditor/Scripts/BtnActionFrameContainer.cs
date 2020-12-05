using Godot;
using Godot.Collections;
using ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.Scripts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Scenes.CodeEditor.Scripts
{
    /// <summary>
    /// Create button for each frame in player code
    /// </summary>
    public class BtnActionFrameContainer : HBoxContainer
    {
		private MovingSceneManager _movingSceneManager;

        private Resource _frameBtnScript;
        public override void _Ready()
        {
            _frameBtnScript = ResourceLoader.Load("res://Sources/App/Shared/Scenes/CodeEditor/Scripts/FrameBtn.cs");
			_movingSceneManager = (MovingSceneManager)this.Owner;

        }

        #region Internal
		public void InitButtonFrames(Array<ActionFrame> frames)
        {
            foreach(Node child in this.GetChildren())
            {
                child.QueueFree();
            }
			foreach (var frame in frames)
            {
                var button = new Button();
                ulong objId = button.GetInstanceId();
                //SetScript dispose old instance and create new instance type of script
                button.SetScript(_frameBtnScript);
                var obj = (FrameBtn)GD.InstanceFromId(objId);
                obj.Frame = frame;
                this.AddChild(obj);

            }
        }
        #endregion
    }
}
