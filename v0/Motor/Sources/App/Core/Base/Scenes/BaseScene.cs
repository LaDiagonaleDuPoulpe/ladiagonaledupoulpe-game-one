using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.Dialog.Scripts;
using Motor.Sources.App.Core.Interfaces.Scenes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Base.Scenes
{
    /// <summary>
    /// Base class to each scene in project
    /// </summary>
    public abstract class BaseScene : Node2D, IDataInit
    {
        #region Fields
        private List<DialogBoxExchange> _exchanges = null; 
        #endregion

        #region Public methods
        public void Initialize(List<DialogBoxExchange> contents)
        {
            this._exchanges = contents;
        }
        #endregion

        #region Internal methods
        private void RunAutoLoadMessages()
        {
            var list = this._exchanges.Where(item => item.AutoLoad)
                                      .OrderBy(item => item.Order);

            foreach (var exchange in list)
            {
                // 07/07/2020 => A qui est la responsabilité de garder la liste des exchanges ?
                //            => DialogBox ? Ou bien la scene ?
            }
        }
        #endregion

        #region Properties
        public List<DialogBoxExchange> Exchanges { get => this._exchanges; }
        #endregion
    }
}
