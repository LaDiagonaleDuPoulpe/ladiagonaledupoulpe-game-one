using Godot;
using Godot.Collections;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins.Server.Enum;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Server
{
    public class ServerManager : Node
    {
        public CodeEditor CodeEditor { get; private set; }
        public ServerManager()
        {
            CodeEditor = new CodeEditor();
        }


    }
}
