using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Games;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Games
{
    /// <summary>
    /// Manager of the check point inf the game
    /// </summary>
    public class CheckPointTaker : Node, IList<CheckPoint>
    {
        #region Fields
        private List<CheckPoint> _list = new List<CheckPoint>();
        #endregion

        #region Public methods
        /// <summary>
        /// Adds new checkpoint with setting data
        /// </summary>
        /// <param name="setting"></param>
        public void Add(CheckPointSetting setting)
        {
            CheckPoint item = new CheckPoint(this._list.Count + 1);
            item.Save(setting);

            this.Add(item);
        }

        /// <summary>
        /// Pops the last item and gets the setting data
        /// </summary>
        /// <returns></returns>
        public CheckPointSetting PopSetting()
        {
            CheckPointSetting setting = null;

            setting = this.Pop()?.Restore();

            return setting;
        }

        /// <summary>
        /// Gets the first item and destroy item from the list
        /// </summary>
        /// <returns></returns>
        public CheckPoint Pop()
        {
            CheckPoint item = null;

            if (this.Count > 0)
            {
                item = this[0];
                this.RemoveAt(0);
            }

            return item;
        }

        public void Add(CheckPoint item)
        {
            this._list.Add(item);
        }

        public void Clear()
        {
            this._list.Clear();
        }

        public bool Contains(CheckPoint item)
        {
            return this._list.Contains(item);
        }

        public void CopyTo(CheckPoint[] array, int arrayIndex)
        {
            this._list.CopyTo(array, arrayIndex);
        }

        public IEnumerator<CheckPoint> GetEnumerator()
        {
            return this._list.GetEnumerator();
        }

        public int IndexOf(CheckPoint item)
        {
            return this._list.IndexOf(item);
        }

        public void Insert(int index, CheckPoint item)
        {
            this._list.Insert(index, item);
        }

        public bool Remove(CheckPoint item)
        {
            return this._list.Remove(item);
        }

        public void RemoveAt(int index)
        {
            this._list.RemoveAt(index);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this._list.GetEnumerator();
        }
        #endregion

        #region Properties
        public CheckPoint this[int index] { get => this._list[index]; set => this._list[index] = value; }
        
        public int Count => this._list.Count;

        public bool IsReadOnly => false;
        #endregion
    }
}
